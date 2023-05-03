import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { persona } from '../../model/persona.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-edit-aboutme',
  templateUrl: './edit-aboutme.component.html',
  styleUrls: ['./edit-aboutme.component.css']
})

export class EditAboutmeComponent implements OnInit {
  persona: persona = null;

  constructor(private personaService: PersonaService, private activatedRouter: ActivatedRoute,
    private router: Router,private tokenService: TokenService) { }

    isLogged = false;

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.getPersona().subscribe(
      data =>{
        this.persona = data;
      }, err =>{
        alert("Error al modificar");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = 1;
    this.personaService.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['']);
      }, err =>{
         alert("Error al modificar");
         this.router.navigate(['']);
      }
    )
  }


}