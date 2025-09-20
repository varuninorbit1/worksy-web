export interface IState {
  setValue(value: IState): void;
  getChildrenName(): string[];
  addChild(state: IState): void;
  getStateOf(childName: string): IState | undefined;
  removeChild(name: string): boolean;
  serialize(): string;
  deserialize(serializedState: string): void;
}
