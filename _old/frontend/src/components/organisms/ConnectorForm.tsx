import { GeneralButton } from "../molecules/GeneralButton";
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
        <InputTextField label="Name" required={true} type="text" />
        <InputTextField label="Host" required={true} type="text" />
        <InputTextField label="Port" required={true} type="number" />
        <InputTextField label="Database" required={true} type="text" />
        <InputTextField label="User" required={true} type="text" />
        <InputTextField label="Password" required={false} type="password" />
      </div>
      <div className="flex justify-between space-x-4">
        <GeneralButton
          text="Test connection"
          tag="get"
          active={true}
          formAction={testFormAction}
        />
        <GeneralButton
          text="Connect"
          tag="post"
          active={true}
          formAction={connectFormAction}
        />
      </div>
    </form>
  );
}
