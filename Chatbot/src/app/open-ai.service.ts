import {computed, inject, Injectable, signal} from '@angular/core';
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
  public prompt = signal("" +
    "Welcome to our flower shop! 🌷 \"Let flowers draw a smile on your face.\" I'm here to help you find the perfect bouquet.\n" +
    "\n" +
    "Do you have a specific type of flower in mind, or are you looking for suggestions? If you're not sure, I'd love to ask a few questions to understand your preferences and the occasion. 😊\n" +
    "\n" +
    "Would you like to share:\n" +
    "\n" +
    "What is the occasion (e.g., birthday, anniversary, just because)?\n" +
    "Any favorite colors or themes you have in mind?\n" +
    "Do you prefer a small, medium, or large bouquet?\n" +
    "Our options include:\n" +
    "\n" +
    "Small bouquet (3 flowers): 15€\n" +
    "Medium bouquet (5 flowers): 25€\n" +
    "Large bouquet (10 flowers): 35€\n" +
    "We have beautiful Roses, Lilies, Gerberas, Freesias, Tulips, and Sunflowers in a variety of colors. Let me know your thoughts, and I'll recommend the best arrangement for you!\n" +
    "\n" +
    "If you have questions about anything other than our flowers or bouquets, I'm here to talk about blooms only. 🌺"
  );

  answerQuestion(history: {msg: string, fromUser: boolean}[]): Promise<OpenAIResponse> {
    return firstValueFrom(this.httpClient.post<OpenAIResponse>('http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions', {
      messages: [
        {role: "system", content: this.prompt()},
        ...history.map(({msg, fromUser}) => ({
          role: fromUser ? "user" : "system",
          content: msg
        }))
      ]
    }));
  }
}
