import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {OpenAIService} from '../open-ai.service';
import {MarkdownModule} from 'ngx-markdown';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule, NgIf],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})
export class AnswerQuestionComponent {
  question = signal("");
  status = signal("");
  history: WritableSignal<{msg: string, fromUser: boolean}[]> = signal([]);

  private readonly openAIService = inject(OpenAIService);

  async answerQuestion()
  {
    if(this.history().length < 20) {
      this.history.update(old => [...old, {msg: this.question(), fromUser: true}]);
      this.status.set("Generating response...");
      const response = await this.openAIService.answerQuestion(this.history());
      this.history.update(old => [...old, {msg: response.choices[0].message.content, fromUser: false}]);
      this.status.set("");
    } else {
      this.status.set("Please start over to ask more questions.");
    }
  }

  clearHistory(){
    this.history.set([]);
  }
}
