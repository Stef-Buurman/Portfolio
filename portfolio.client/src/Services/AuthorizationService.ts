import { Injectable } from '@angular/core';
import { from, map, Observable, tap } from 'rxjs';
import type { ApiResult } from 'typedapi-client-helpers';
import { createApiKey } from '../api/methods/ApiKey.api';
import type {
  ApiKeyResponse,
  HttpValidationProblemDetails,
  ProblemDetails,
} from '../api/generated/data-contracts';

type ApiKeyResult = ApiResult<
  ApiKeyResponse,
  HttpValidationProblemDetails | ProblemDetails
>;

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private apiKey: string | null = null;

  getApiKey(): Observable<ApiKeyResponse> {
    return from(createApiKey()).pipe(
      map((result) => this.unwrap(result)),
      tap(({ apiKey }) => {
        this.apiKey = apiKey;
      }),
    );
  }

  get currentApiKey(): string | null {
    return this.apiKey;
  }

  removeApiKey(): void {
    this.apiKey = null;
  }

  private unwrap(result: ApiKeyResult): ApiKeyResponse {
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
