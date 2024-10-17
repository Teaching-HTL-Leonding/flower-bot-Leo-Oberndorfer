import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

export type OpenAIResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    }
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private httpClient = inject(HttpClient);

  answerQuestion(history: {msg: string, fromUser: boolean}[]): Promise<OpenAIResponse> {
    return firstValueFrom(this.httpClient.post<OpenAIResponse>('http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions', {
      messages: history.map(({msg, fromUser}) => ({
        role: fromUser ? "user" : "system",
        content: msg
      }))
    }));
  }
}
