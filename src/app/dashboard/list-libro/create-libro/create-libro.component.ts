import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/service/alert-swall.service';
import { AutorService } from 'src/app/service/autor.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ColecionService } from 'src/app/service/colecion.service';
import { LibroService } from 'src/app/service/libro.service';

@Component({
  selector: 'app-create-libro',
  templateUrl: './create-libro.component.html',
  styleUrls: ['./create-libro.component.css']
})
export class CreateLibroComponent implements OnInit {
  autores: any[];
  categorias: any[];
  coleciones: any[];
  modalOptions: NgbModalOptions = {};
  libroForm: FormGroup;
  @Input() title: string;
  @Input() id: string;
  isLoading = false;
  imagen: any;
  archivo: any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public libroService: LibroService,
    public categoriaService: CategoriaService,
    public colecionService: ColecionService,
    public autorService: AutorService,
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
    this.listCategorias();
    // this.listColecions();
    this.listAutores();
    if (this.id !== undefined) {
      this.libroService.getById(this.id).subscribe(data => {
        // console.log("x<zx<zx<zx",data);
        let dataArray = data.codigo.split('-');
        // console.log("x<zx<zx<zx",dataArray[2]);
        this.libroForm.setValue({
          titulo: data.titulo,
          numeroEdicion: data.numeroEdicion,
          lugarEdicion: data.lugarEdicion,
          anioEdicion: data.anioEdicion,
          descripcion: data.descripcion,
          autor_id: data.autor_id,
          coleccion_id: data.coleccion_id,
          categoria_id: data.categoria_id,
          numeroLibro: dataArray[2],
          imagen: '',
          archivo: ''
        });
      });
    }
  }

  createForm() {
    this.libroForm = this.formBuilder.group({
      titulo: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      numeroEdicion: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      lugarEdicion: ['',[Validators.required]],
      anioEdicion: ['',[Validators.required, Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      descripcion: ['',[Validators.pattern('[0-9a-zA-ZñÑáéíóúÁÉÍÓÚx ]*')]],
      numeroLibro: ['',[Validators.required]],
      autor_id: ['',[Validators.required]],
      coleccion_id: [''],
      categoria_id: ['',[Validators.required]],
      imagen: [''],
      archivo: [''],
    });
  }

  register(libroForm: any) {
    const formData = new FormData();

    formData.append('titulo', libroForm.titulo);
    formData.append('numeroEdicion', libroForm.numeroEdicion);
    formData.append('lugarEdicion', libroForm.lugarEdicion);
    formData.append('anioEdicion', libroForm.anioEdicion);
    formData.append('descripcion', libroForm.descripcion);
    formData.append('autor_id', libroForm.autor_id);
    // formData.append('coleccion_id', libroForm.coleccion_id);
    formData.append('categoria_id', libroForm.categoria_id);
    formData.append('numeroLibro', libroForm.numeroLibro);

    if (this.imagen) {
      console.log(this.imagen);
      formData.append('imagen', this.imagen);
    }else{
      formData.append('imagen', '');
    }

    if (this.archivo) {
      console.log(this.archivo);
      formData.append('archivo', this.archivo);
    }else{
      formData.append('archivo', '');
    }

    // console.log(this.selectedFile[0]);
    this.isLoading = true;
    if (this.id === undefined) {
      this.libroService
        .create(formData)
        .pipe(
          finalize(() => {
            this.libroForm.markAsPristine();
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
      this.libroService
        .updatePost(this.id, formData)
        .pipe(
          finalize(() => {
            this.libroForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            this.alertSwal.showSwallSuccess(data3.success);
            this.activeModal.close(data3);
          },
          (error: any) => {
            this.alertSwal.showSwallError(error);
          }
        );
    }
  }

  listCategorias(){
    this.categoriaService.getEnabledList().subscribe(res => {
      this.categorias = res;
      console.log(res);
    });
  }

  // listColecions(){
  //   this.colecionService.getEnabledList().subscribe(res => {
  //     this.coleciones = res;
  //     console.log(res);
  //   });
  // }

  listAutores(){
    this.autorService.getEnabledList().subscribe(res => {
      this.autores = res;
      console.log(res);
    });
  }

  cargarImagen(event){
    this.imagen = event.target.files[0]
  }

  cargarAchivo(event){
    this.archivo = event.target.files[0]
  }
}
