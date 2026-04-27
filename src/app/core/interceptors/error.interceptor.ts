import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 500) snack.open('Server error. Please try again.', 'Close', { duration: 4000 });
      else if (err.status === 404) snack.open('Resource not found.', 'Close', { duration: 4000 });
      return throwError(() => err);
    })
  );
};
