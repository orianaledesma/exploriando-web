import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { DocumentacionRequest, DocumentacionResult } from '../models/documentacion.model';

const REQUEST_TIMEOUT_MS = 20_000;
const RATE_LIMIT_KEY     = 'doc_requests';
const RATE_LIMIT_MAX     = 5;
const RATE_LIMIT_WINDOW  = 10 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class DocumentacionService {
  private readonly http = inject(HttpClient);

  isRateLimited(): boolean {
    return this.getTimestamps().length >= RATE_LIMIT_MAX;
  }

  query(request: DocumentacionRequest): Observable<DocumentacionResult> {
    return this.http
      .post<DocumentacionResult>(environment.documentacionApiUrl, request)
      .pipe(
        timeout(REQUEST_TIMEOUT_MS),
        catchError((err: unknown) => throwError(() => err)),
      );
  }

  recordRequest(): void {
    const timestamps = this.getTimestamps();
    timestamps.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
  }

  isOfflineError(err: unknown): boolean {
    return err instanceof HttpErrorResponse && err.status === 0;
  }

  private getTimestamps(): number[] {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const all: number[] = stored ? (JSON.parse(stored) as number[]) : [];
    const now = Date.now();
    return all.filter(t => now - t < RATE_LIMIT_WINDOW);
  }
}
