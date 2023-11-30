import { GeneralButton } from "../atoms/GeneralButton";
import { InputTextField } from "../molecules/InputTextField";
import { useFormState, useFormStatus } from "react-dom";

export function ConnectorForm() {
  function test(currentState: null, data: FormData) {
    const json = Object.fromEntries(data);
    console.log(`test connection`);
    console.log(json);
    return currentState;
  }
  const [testFormState, testFormAction] = useFormState(test, null);
  function connect(currentState: null, data: FormData) {
    const json = Object.fromEntries(data);
    console.log(`connect`);
    console.log(json);
    return currentState;
  }
  const [connectFormState, connectFormAction] = useFormState(connect, null);

  return (
    <form className="space-y-3">
      <div className="space-y-2">
        <InputTextField label="Name" isRequired={true} />
        <InputTextField label="Host" isRequired={true} />
        <InputTextField label="Port" isRequired={true} />
        <InputTextField label="Database" isRequired={true} />
        <InputTextField label="User" isRequired={true} />
        <InputTextField label="Password" isRequired={false} />
      </div>
      <div className="flex justify-between space-x-4">
        <GeneralButton
          text="Test connection"
          color="get"
          active={true}
          formAction={testFormAction}
        />
        <GeneralButton
          text="Connect"
          color="post"
          active={true}
          formAction={connectFormAction}
        />
      </div>
    </form>
  );
}
