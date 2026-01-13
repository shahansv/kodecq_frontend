"use client";
import { CloudSync, Code2, FileTerminal, Laptop, Users } from "lucide-react";
import { GlowingEffect } from "../components/ui/aceternity/GlowingEffect";

export function HomeBentoCard() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-136 xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={
          <CloudSync className="h-4 w-4 text-black dark:text-neutral-400" />
        }
        title="Real Time Collaborative Coding"
        description="Write code together and see every change instantly. Each keystroke update syncs in real time, making collaboration feel as natural as coding side by side."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Users className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Workspace Based Collaboration"
        description="Create or join dedicated workspaces where teams collaborate in isolated environments. Each workspace keeps code, language selection, and participants perfectly in sync for focused teamwork."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Laptop className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="A Complete Real Time Collaborative Coding Workspace"
        description="Kodecq brings developers into one shared IDE where everyone codes in the same file, sees changes instantly, and collaborates seamlessly in real time. Powered by the Monaco Editor and real time syncing, it's built for teams, students, pair programming, and interviews, everything you need to collaborate and build at warp speed, all in one place."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={
          <FileTerminal className="h-4 w-4 text-black dark:text-neutral-400" />
        }
        title="Multi Language Code Execution"
        description="Run code directly inside the workspace with support for multiple programming languages. Execute, test, and debug instantly without leaving the editor, powered by secure remote execution."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Code2 className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="VS Code Style Editing Experience"
        description="Enjoy a familiar and powerful coding experience with Monaco Editor. Get syntax highlighting, smart autocomplete, and language aware editing, all directly in your browser."
      />
    </ul>
  );
}

const GridItem = ({ area, icon, title, description }) => {
  return (
    <li className={`min-h-56 list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
