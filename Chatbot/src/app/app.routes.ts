import { Routes } from '@angular/router';
import {AnswerQuestionComponent} from './answer-question/answer-question.component';

export const routes: Routes = [
  { path: "answer-question", component: AnswerQuestionComponent },
  { path: "", redirectTo: "/answer-question", pathMatch: "full" }
];
