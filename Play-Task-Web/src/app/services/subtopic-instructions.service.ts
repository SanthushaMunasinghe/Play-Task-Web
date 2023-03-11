import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubtopicInstructionsService {
  instructions: string[] = [];

  private instructionsSubject = new Subject<string[]>();
  getInstructions$ = this.instructionsSubject.asObservable();

  AddInstructions(instruction: string) {
    this.instructions.push(instruction);
  }

  updateInstructions(inst: string[]) {
    this.instructionsSubject.next(inst);
  }

  RemoveInstruction(instruction: string) {
    const index = this.instructions.indexOf(instruction);
    if (index !== -1) {
      this.instructions.splice(index, 1);
    }
  }

  GetInstructions() {
    return this.instructions;
  }
  constructor() {}
}
