import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {OpenAIService} from '../open-ai.service';
import {MarkdownModule} from 'ngx-markdown';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule],
  templateUrl: './answer-question.component.html',
  styleUrl: './answer-question.component.css'
})
export class AnswerQuestionComponent {
  question = signal("");
  history: WritableSignal<{msg: string, fromUser: boolean}[]> = signal([]);

  private readonly openAIService = inject(OpenAIService);

  async answerQuestion()
  {
    this.history.update(old => [...old, {msg: this.question(), fromUser: true}]);
    const response = await this.openAIService.answerQuestion(this.history());
    this.history.update(old => [...old, {msg: response.choices[0].message.content, fromUser: false}]);
  }
}
