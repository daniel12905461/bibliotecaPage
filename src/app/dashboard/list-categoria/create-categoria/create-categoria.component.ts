import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.css']
})
export class CreateCategoriaComponent implements OnInit {
  modalOptions: NgbModalOptions = {};
  categoriaForm: FormGroup;
  @Input() title: string;
  @Input() id: string;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public categoriaService: CategoriaService,
    public alertSwal: AlertSwallService
  ) {
    this.modalOptions = {
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.createForm();
    if (this.id !== undefined) {
      this.categoriaService.getById(this.id).subscribe(data => {
        this.categoriaForm.setValue({
          nombre: data.nombre,
          codigo: data.codigo
        });
      });
    }
  }

  createForm() {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      codigo: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]]
    });
  }

  register(categoriaForm: any) {
    this.isLoading = true;
    if (this.id === undefined) {
      this.categoriaService
        .create(categoriaForm)
        .pipe(
          finalize(() => {
            this.categoriaForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            this.alertSwal.showSwallSuccess(data.success);
            this.activeModal.close(data);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.error);
          }
        );
    } else {
      this.categoriaService
        .update(this.id, categoriaForm)
        .pipe(
          finalize(() => {
            this.categoriaForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.alertSwal.showSwallSuccess(data3.success);
            this.activeModal.close(data3);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error.error);
          }
        );
    }
  }
}
