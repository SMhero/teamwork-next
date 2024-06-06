import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { getTeammate } from "@/actions/team/teammate";
import { routes } from "@/config/app";
import { Button, Textarea, User } from "@nextui-org/react";
import NoteForm from "@/modules/forms/NoteForm";
import ControlPanel from "@/components/ControlPanel/ControlPanel";

type Params = {
  params: {
    id: string;
  };
};

export default async function Teammate({ params }: Params) {
  const teammate = await getTeammate(params.id);

  return (
    <section>
      <Breadcrumbs
        list={[
          {
            label: "Team",
            href: routes.team,
          },
          {
            label: teammate.name,
            href: routes.team,
          },
        ]}
      />
      <div className="mt-8">
        <ControlPanel>
          <User
            name={<span className="text-large pl-4">{teammate.name}</span>}
            description={<span className="text-large pl-4">{teammate.position}</span>}
            avatarProps={{
              className: "w-24 h-24",
              isBordered: true,
              radius: "sm",
              src: teammate.photo,
            }}
          />
          <div className="flex justify-center gap-4">
            <Button color="primary">Edit</Button>
            <Button color="primary">New meeting</Button>
          </div>
        </ControlPanel>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <NoteForm />
          <div>CALENDAR</div>
        </div>
      </div>
    </section>
  );
}
