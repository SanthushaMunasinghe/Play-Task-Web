import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { faCircleDot } from '@fortawesome/free-regular-svg-icons';

import { SubtopicInstructionsService } from 'src/app/services/subtopic-instructions.service';

@Component({
  selector: 'app-edit-subtopic-instructions',
  templateUrl: './edit-subtopic-instructions.component.html',
  styleUrls: ['./edit-subtopic-instructions.component.css'],
})
export class EditSubtopicInstructionsComponent {
  faCircleDotIcon = faCircleDot;

  addInstructionForm = this.formBuilder.group({
    instruction: '',
  });

  instructions: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subtopicInstructionsService: SubtopicInstructionsService
  ) {}

  ngOnInit() {
    this.subtopicInstructionsService.getInstructions$.subscribe(
      (instructions: string[]) => {
        this.instructions = instructions;
      }
    );
  }

  onSubmit(): void {
    const formInstructions = this.addInstructionForm.value;

    if (formInstructions.instruction) {
      this.instructions.push(formInstructions.instruction);

      this.subtopicInstructionsService.updateInstructions(this.instructions);
      this.addInstructionForm.reset();
    }
  }

  onRemove(inst: string): void {
    const index = this.instructions.indexOf(inst);
    if (index !== -1) {
      this.instructions.splice(index, 1);
    }
    this.subtopicInstructionsService.updateInstructions(this.instructions);
  }
}
