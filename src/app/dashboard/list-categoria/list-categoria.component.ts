import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { CreateCategoriaComponent } from './create-categoria/create-categoria.component';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css']
})
export class ListCategoriaComponent implements OnInit {
  categorias: any[];
  modalOptions: NgbModalOptions = {};

  constructor(
    private modalService: NgbModal,
    public categoriaService: CategoriaService,
    public alertSwal: AlertSwallService
    ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.categoriaService.getAll().subscribe(res => {
      this.categorias = res;
      console.log(res);
    });
  }

  create(){
    const modalRef = this.modalService.open(
      CreateCategoriaComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Crear Nuevo';

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });
  }

  edit(id: any){
    const modalRef = this.modalService.open(
      CreateCategoriaComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Editar';
    modalRef.componentInstance.id = id;

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });

  }

  eliminar(id: any){
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de eliminar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then(res => {
        // console.log(res);
        if (res.value === true) {
          this.categoriaService.delete(id).subscribe(
            (data: any) => {
              // console.log(res);
              this.alertSwal.showSwallSuccess(data.success);
              this.list();
            },
            (error: any) => this.alertSwal.showSwallError(error.error)
          );
        }
      });
  }

  enable(id: any) {
    this.categoriaService.enabled(id).subscribe(
      data => {
        this.list();
      },
      error => {
        this.alertSwal.showSwallError(error.error);
        this.list();
      }
    );
  }
}
