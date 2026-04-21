import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { from, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EmailCaptureData } from '../models/email-capture.model';

const RATE_LIMIT_KEY    = 'email_submissions';
const RATE_LIMIT_MAX    = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const SUBMITTED_KEY     = 'email_submitted';

export const GIFT_DRIVE_URL =
  'https://drive.google.com/file/d/1E0U4zTIWCXmZjXQdV8zAFAj95HQ6MsJ5/view';

@Injectable({ providedIn: 'root' })
export class EmailCaptureService {

  isRateLimited(): boolean {
    return this.getTimestamps().length >= RATE_LIMIT_MAX;
  }

  hasAlreadySubmitted(source = 'default'): boolean {
    const key = source === 'default' ? SUBMITTED_KEY : `${SUBMITTED_KEY}_${source}`;
    return localStorage.getItem(key) === 'true';
  }

  submit(data: EmailCaptureData): Observable<unknown> {
    const { serviceId, templateId, publicKey } = environment.emailjs;
    return from(
      emailjs.send(
        serviceId,
        templateId,
        { email: data.email, source: data.source, gift_link: GIFT_DRIVE_URL },
        publicKey,
      ),
    );
  }

  recordSubmission(source = 'default'): void {
    const key = source === 'default' ? SUBMITTED_KEY : `${SUBMITTED_KEY}_${source}`;
    const timestamps = this.getTimestamps();
    timestamps.push(Date.now());
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(timestamps));
    localStorage.setItem(key, 'true');
  }

  private getTimestamps(): number[] {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const all: number[] = stored ? (JSON.parse(stored) as number[]) : [];
    const now = Date.now();
    return all.filter(t => now - t < RATE_LIMIT_WINDOW);
  }
}
