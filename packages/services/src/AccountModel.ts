import Model from '@paxico/core/build/Model';
import IModel from '@paxico/core/build/IModel';
import { throws } from 'assert';

export interface IAccountModel extends IModel {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
    email: string;
    phone: string;
}

export default class AccountModel extends Model implements IAccountModel {
    private _firstname: string;
    private _lastname: string;
    private _age: number;
    private _email: string;
    private _phone: string;


    constructor(dto: IAccountModel) {
        super(dto);

        this._firstname = this.firstname = dto.firstname;
        this._lastname = this.lastname = dto.lastname;
        this._age = this.age = dto.age;
        this._email = this.email = dto.email;
        this._phone = this.phone = dto.phone;
    }

    get firstname(): string {
        return this._firstname;
    }

    set firstname(value: string) {
        // assertions
        this._firstname = value;
    }

    get lastname(): string {
        return this._lastname;
    }

    set lastname(value: string) {
        // assertions
        this._lastname = value;
    }
    get age(): number {
        return this._age;
    }

    set age(value: number) {
        // assertions
        this._age = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        // assertions
        this._email = value;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        // assertions
        this._phone = value;
    }


    toDTO() {
        return { ...super.toDTO(), firstname: this.firstname, lastname: this.lastname, age: this.age, email: this.email, phone: this.phone };
    }

    toJSON() {
        return this.toDTO();
    }
}