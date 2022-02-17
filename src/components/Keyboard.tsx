import React, { FC } from "react";

type ButtonProps = {
    id: string;
    class: string;
    value: string;
}

type Props = {
    buttons: ButtonProps[];
    handleButtonClick: any
}

export const Keyboard: FC<Props> = ({ buttons, handleButtonClick }) => {

    return (
        <div className='keyboard'>
            {buttons.map((numb: ButtonProps) => {
                if(numb.class==='yellow'){
                    return <button className="buttonSmallY" id={numb.id} value={numb.class} onClick={handleButtonClick} key={numb.id}>{numb.value}</button>
                }else if (numb.class==='red'){
                    return <button className="buttonSmallR" id={numb.id} value={numb.class} onClick={handleButtonClick} key={numb.id}>{numb.value}</button>
                }else{
                    return <button className="buttonSmall" id={numb.id} value={numb.class} onClick={handleButtonClick} key={numb.id}>{numb.value}</button>
                }
                
            })}

        </div>
    )
}