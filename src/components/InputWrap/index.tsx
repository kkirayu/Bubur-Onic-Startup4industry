


interface InputWrapProps {
    label: string;
    description?: string;
    
    children: React.ReactNode;
}
export const InputWrap = (props: InputWrapProps) => {

    return <>

        <div className="justify-start items-start align-top gap-12 inline-flex">
            <div className="flex-col justify-start align-top items-start gap-1 inline-flex">
                <div className="justify-start align-top gap-0.5 inline-flex">
                    <div className="justify-start items-start gap-0.5 flex">
                        <div className="bg-white justify-start items-center gap-0.5 flex">
                            <div className="text-gray-700 text-sm font-semibold font-['Poppins']">{props.label}</div>
                        </div>
                        <div className="text-red-600 text-sm font-semibold font-['Poppins']">*</div>
                    </div>
                </div>

                {props.children}
                <div className="text-gray-400 text-xs font-normal font-['Poppins']">{props.description} &nbsp;</div>
            </div>
        </div>
    </>


}
