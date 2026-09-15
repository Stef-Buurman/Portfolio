import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import type { ApiResult } from 'typedapi-client-helpers';
import type {
  Contact,
  HttpValidationProblemDetails,
  ProblemDetails,
} from '../api/generated/data-contracts';
import {
  deleteContact as deleteContactRequest,
  getContacts as getContactsRequest,
  uploadContact,
} from '../api/methods/Contact.api';
import { AuthorizationService } from './AuthorizationService';

type ContactApiError = HttpValidationProblemDetails | ProblemDetails;

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private readonly authorizationService: AuthorizationService) {}

  sendContact(contact: Contact): Observable<void> {
    const apiKey = this.authorizationService.currentApiKey;

    if (!apiKey) {
      return new Observable<void>((subscriber) => {
        subscriber.error(
          Object.assign(new Error('No API key is available.'), {
            status: 401,
          }),
        );
      });
    }

    return from(
      uploadContact(contact, {
        params: {
          headers: {
            Authorization: apiKey,
          },
        },
      }),
    ).pipe(map((result) => this.unwrap(result)));
  }

  getContacts(apiKey: string): Observable<Contact[]> {
    return from(
      getContactsRequest({
        params: {
          headers: {
            Authorization: apiKey,
          },
        },
      }),
    ).pipe(map((result) => this.unwrap(result)));
  }

  deleteContact(id: number, apiKey: string): Observable<void> {
    return from(
      deleteContactRequest(
        { id },
        {
          params: {
            headers: {
              Authorization: apiKey,
            },
          },
        },
      ),
    ).pipe(map((result) => this.unwrap(result)));
  }

  private unwrap<T>(result: ApiResult<T, ContactApiError>): T {
    if (result.ok) {
      return result.response;
    }

    const error = new Error(
      `API request failed with status ${result.status}`,
    ) as Error & { status: number; cause?: unknown };

    error.status = result.status;
    error.cause = result.error;

    throw error;
  }
}
