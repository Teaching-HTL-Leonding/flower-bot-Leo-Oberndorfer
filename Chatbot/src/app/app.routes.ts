import { Routes } from '@angular/router';
import {AnswerQuestionComponent} from './answer-question/answer-question.component';
import {SystemPromptComponent} from './system-prompt/system-prompt.component';

export const routes: Routes = [
  { path: "answer-question", component: AnswerQuestionComponent },
  { path: "system-prompt", component: SystemPromptComponent },
  { path: "", redirectTo: "/answer-question", pathMatch: "full" }
];
