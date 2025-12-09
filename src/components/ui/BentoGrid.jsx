"use client";
import { Box, Code2, FolderKanban, Laptop, Lock, MessageSquare, MousePointer2, Search, Settings, Share2, Sparkles, Users, UserSquare } from "lucide-react";
import GridItem from "./GridItem";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-136 xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<MousePointer2 className="h-4 w-4" />}
        title="Real Time Collaborative Coding"
        description="See every cursor, keystroke, and update the moment it happens. Code together in a single shared file with zero delay."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Users className="h-4 w-4 " />}
        title="Multi User Rooms"
        description="Create rooms for your team, classmates, or interview candidates and collaborate in a shared coding space built for effortless group sessions."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Laptop className="h-4 w-4 " />}
        title="A Complete Real Time Collaborative Coding Workspace"
        description="Kodecq brings multiple developers into one shared IDE where everyone codes in the same file, sees changes instantly, and communicates through built-in chat, voice, and video. Powered by the Monaco editor, it's perfect for teams, students, pair-programming, and interviews.
Everything you need to collaborate and build at warp speed right in one place."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Code2 className="h-4 w-4" />}
        title="VS Code Powered Editing"
        description="Get the speed, accuracy, and comfort of Monaco including syntax highlighting and autocomplete directly in your browser."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<MessageSquare className="h-4 w-4 " />}
        title="Integrated Chat & Video"
        description="Stay connected without switching tools. Chat, call, or hop on video right inside the workspace while you code together."
      />
    </ul>
  );
}

export default GlowingEffectDemo;
