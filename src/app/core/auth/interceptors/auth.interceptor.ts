import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Attaches Authorization header with Bearer token if available in localStorage.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');

  const isPublic = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  if (token && !req.headers.has('Authorization') && !isPublic) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }
  return next(req);
};
