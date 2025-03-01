
import { environment } from "src/environments/environment";
// const base_url = environment.apiUrlMedia;
export class User {

    id!: number;
    // role_id: number = 3; // 3 = Rol miembro
    username: string = "";
    email: string = "";
    password?: string = "";
    first_name: string = "";
    last_name: string = "";
    token: string = "";
    is_active: number = 0;
    n_doc: number = 0;
    created_at: string = "";
    image: string = "";
    role?: 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST';
    



    // public get isActive():boolean{
    //     return (this.is_active === 1 ? true: false);
    // }


    // get imagenUrl(){

    //   if(!this.image){
    //     return `${base_url}users/no-image.jpg`;
    //   } else if(this.image.includes('https')){
    //     return this.image;
    //   } else if(this.image){
    //     return `${base_url}users/${this.image}`;
    //   }else {
    //     return `${base_url}/no-image.jpg`;
    //     // return `./assets/img/no-image.jpg`;
    //   }

    // }
    

}

export class Patient {
        user:User;
    appointments:any;
    appointment:any;
    patient_id:number;
    appointment_id:number;
    num_appointment:number;
    money_of_appointments:number;
    num_appointment_pendings:number;
    appointment_attention:any;
    appointment_pendings:any;
    appointment_checkeds:any;
    recetas:any;
    settting:any;
    doctor_id:number;
    address:string;
    mobile:string;
}
