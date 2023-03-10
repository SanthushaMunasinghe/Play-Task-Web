import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubtopicInstructionsService {
  instructions: string[] = [];

  AddInstructions(instruction: string) {
    this.instructions.push(instruction);
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
