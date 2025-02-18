import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import IconHome from "../../assets/IconHome";
import IconPeople from "../../assets/IconPeople";
import IconWindow from "../../assets/IconWindow";
import { cn } from "../../utils/cn";

const links = [
  {
    title: "Home",
    link: "/",
    icon: IconHome,
    disabled: true,
  },
  {
    title: "Clientes",
    link: "/clientes",
    icon: IconPeople,
    disabled: false,
  },
  {
    title: "Produtos",
    link: "/produtos",
    icon: IconWindow,
    disabled: true,
  },
];

interface PropsSideRoot extends PropsWithChildren {
  open: boolean;
}

const SideRoot: React.FC<PropsSideRoot> = ({ open, children }) => (
  <AnimatePresence initial={false}>
    {open ? (
      <motion.div
        {...{
          initial: {
            left: -120,
          },
          animate: {
            left: 0,
            width: "260px",
            transition: {
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            },
          },
          exit: {
            left: -260,
            transition: {
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            },
          },
        }}
        className={cn(
          "absolute top-0 left-0 z-20 flex h-full flex-col shadow",
          // open ? "w-[260px]" : "pointer-events-none w-0 opacity-0",
        )}
      >
        {children}
      </motion.div>
    ) : null}
  </AnimatePresence>
);

interface PropsOverlay {
  open: boolean;
  onClick: VoidFunction;
}

const Overlay = ({ open, onClick }: PropsOverlay) => (
  <AnimatePresence initial={false}>
    {open ? (
      <motion.div
        {...{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 100,
            transition: {
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: [0.33, 1, 0.68, 1],
            },
          },
        }}
        onClick={onClick}
        className={cn("bg-foreground/50 absolute top-0 left-0 z-10 size-full")}
      ></motion.div>
    ) : null}
  </AnimatePresence>
);

const Header = () => (
  <header className="flex min-h-[128px] w-full flex-initial items-center justify-center backdrop-blur-[32px]">
    <img src="logo.png" alt="Logo Teddy Open Finance" className="w-[100px]" />
  </header>
);

const Body = () => {
  const [actualLink, setActualLink] = React.useState<string>();
  return (
    <section className="bg-background w-full flex-1">
      <div className="flex w-full flex-col gap-4 pt-10">
        {links.map((item) => (
          <NavLink
            to={item.link}
            key={item.title}
            className={({ isActive }) => {
              if (isActive) setActualLink(item.title);
              return cn(
                "group flex gap-2 py-2 pl-6",
                isActive && "border-primary border-r-2",
                item.disabled && "pointer-events-none opacity-50",
              );
            }}
          >
            <div>
              <item.icon
                className={cn(actualLink == item.title && "fill-primary")}
              />
            </div>
            <label>{item.title}</label>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

interface PropsTrigger {
  onClick: VoidFunction;
}

const Trigger: React.FC<PropsTrigger> = ({ onClick }) => (
  <div className="absolute top-8 left-11 cursor-pointer p-1" onClick={onClick}>
    <Menu className="size-6.5" />
  </div>
);

const Sidebar = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSide = (open: boolean) => {
    setOpen(open);
  };
  return (
    <>
      <Trigger onClick={() => handleSide(true)} />
      <SideRoot open={open}>
        <Header />
        <Body />
      </SideRoot>
      <Overlay open={open} onClick={() => handleSide(false)} />
    </>
  );
};

export default Sidebar;
