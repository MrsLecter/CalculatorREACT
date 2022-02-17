import React, { FC } from "react";

type Props = {
    inputDisplay: any;
}

export const Display: FC<Props> = ({ inputDisplay }) => {
    return (
        <div className="displayBox">
            {inputDisplay}
        </div>
    )
}