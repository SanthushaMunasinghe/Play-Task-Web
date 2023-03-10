import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

import { SubtopicInstructionsService } from 'src/app/services/subtopic-instructions.service';

@Component({
  selector: 'app-subtopic-instructions',
  templateUrl: './subtopic-instructions.component.html',
  styleUrls: ['./subtopic-instructions.component.css'],
})
export class SubtopicInstructionsComponent {
  faCircleDotIcon = faCircleDot;

  addInstructionForm = this.formBuilder.group({
    instruction: '',
  });

  instructions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subtopicInstructionsService: SubtopicInstructionsService
  ) {}

  onSubmit(): void {
    const formInstructions = this.addInstructionForm.value;

    if (formInstructions.instruction) {
      this.subtopicInstructionsService.AddInstructions(
        formInstructions.instruction
      );

      this.addInstructionForm.reset();
    }

    this.instructions = this.subtopicInstructionsService.GetInstructions();
  }

  onRemove(inst: string): void {
    this.subtopicInstructionsService.RemoveInstruction(inst);
  }
}
