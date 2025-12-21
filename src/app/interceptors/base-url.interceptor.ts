import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl = 'http://localhost:3000';

  // Si la URL ya es absoluta, no la tocamos
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const reqClone = req.clone({
    url: `${baseUrl}${req.url}`
  });

  return next(reqClone);
};

