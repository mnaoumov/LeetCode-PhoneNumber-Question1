import { useId } from "react";

export default function PhoneTextBox() {
    const id = useId();

    return (
        <div className="container text-center">
            <input type="tel" id={id} maxLength="16" placeholder="mobile number" autoComplete="off" />
            <div><label htmlFor={id}>(123) 456-7890</label></div>
        </div>
    );
}
