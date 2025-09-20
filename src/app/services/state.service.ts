import { IState } from "../shared/interface/IState.interface";
import { Injectable } from '@angular/core';

export class State implements IState {
  public name: string;
  private value?: State;
  private children: Map<string, State>;


  constructor(name: string, value?: State) {
    this.name = name;
    this.value = value;
    this.children = new Map();
  }

  // --- IState API ---

  setValue(value: IState): void {
    this.value = State.asState(value);
  }

  getChildrenName(): string[] {
    return Array.from(this.children.keys());
  }

  addChild(state: IState): void {
    const node = State.asState(state);
    this.children.set(node.name, node);
  }

  getStateOf(childName: string): IState | undefined {
    return this.children.get(childName);
  }

  removeChild(name: string): boolean {
    return this.children.delete(name);
  }

  serialize(): string {
    return JSON.stringify(this.toPlain());
  }

  deserialize(serializedState: string): void {
    const obj = JSON.parse(serializedState);
    const rebuilt = State.fromPlain(obj);

    // Mutate this instance to mirror the rebuilt one
    this.name = rebuilt.name;
    this.value = rebuilt.value;
    this.children = rebuilt.children;
  }

  // --- helpers ---

  /** Accept any IState; if it's not a State instance, rebuild from its own serialize() output. */
  private static asState(s: IState): State {
    if (s instanceof State) return s;
    // Fallback: use its own serialization to reconstruct a concrete State
    const str = s.serialize();
    return State.fromPlain(JSON.parse(str));
  }

  /** Convert the subtree into a plain JSON-friendly object. */
  private toPlain(): any {
    return {
      name: this.name,
      value: this.value ? this.value.toPlain() : null,
      children: Array.from(this.children.values()).map((c) => c.toPlain()),
    };
  }

  /** Rebuild a State (recursively) from a plain object produced by toPlain(). */
  private static fromPlain(obj: any): State {
    const node = new State(obj?.name ?? "unnamed");
    if (obj?.value) node.value = State.fromPlain(obj.value);

    if (Array.isArray(obj?.children)) {
      for (const child of obj.children) {
        const childState = State.fromPlain(child);
        node.children.set(childState.name, childState);
      }
    }
    return node;
  }
}
