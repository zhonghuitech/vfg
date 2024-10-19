import { deepClone, randFieldId } from "./func";

export default function (props: any) {
    function copy(origin: any) {
        let new_element = deepClone(origin, true);
        console.log("fieldName", new_element);
        new_element.__ID = randFieldId();

        if ("fieldName" in new_element.attrs) {
            new_element.attrs.fieldName.__val__ = new_element.__ID;
        }

        new_element.__formId = props.formId;

        return new_element;
    }

    const onEnd = function (obj: any) {
        // console.log(obj);
    };

    return { copy, onEnd };
}
