import { Injectable } from '@angular/core';
import { from, map, Observable, tap } from 'rxjs';
import type { ApiResult } from 'typedapi-client-helpers';
import { apiKeyCreateApiKeyGETApiCreateApiKey } from '../api/methods/ApiKey.api';
import type {
  HttpValidationProblemDetails,
  ProblemDetails,
} from '../api/generated/data-contracts';

type ApiKeyResult = ApiResult<
  { apiKey: string } | void,
  HttpValidationProblemDetails | ProblemDetails
>;

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private apiKey: string | null = null;

  getApiKey(): Observable<{ apiKey: string }> {
    return from(apiKeyCreateApiKeyGETApiCreateApiKey()).pipe(
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

  private unwrap(result: ApiKeyResult): { apiKey: string } {
    if (result.ok) {
      if (
        result.response &&
        typeof result.response === 'object' &&
        'apiKey' in result.response
      ) {
        return result.response;
      }

      throw new Error('API key response is missing the apiKey field.');
    }

    const error = new Error(
      `API request failed with status ${result.status}`,
    ) as Error & { status: number; cause?: unknown };

    error.status = result.status;
    error.cause = result.error;

    throw error;
  }
}
