import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const responseMessageInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as any;
          if (body?.message) {
            showToast(body.message, 'success');
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        const msg =
          error.error?.message ||
          error.message ||
          'Something went wrong';

        showToast(msg, 'error');
      }
    })
  );
};

/* 🔔 Minimal toast implementation */
function showToast(message: string, type: 'success' | 'error') {
  const toast = document.createElement('div');

  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 16px';
  toast.style.background =
    type === 'success' ? '#16a34a' : '#dc2626';
  toast.style.color = '#fff';
  toast.style.borderRadius = '6px';
  toast.style.zIndex = '9999';
  toast.style.fontSize = '14px';
  toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
