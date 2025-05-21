import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import useFetchSettings from "../hooks/useFetchSettings";

function Settings() {
  const { settings, isPending, status } = useFetchSettings();

  if (isPending === "fetching") return <Spinner />;
  return (
    <>
      <Heading as="h1">Update hotel settings</Heading>
      {status === "success" && <UpdateSettingsForm settings={settings} />}
    </>
  );
}

export default Settings;
