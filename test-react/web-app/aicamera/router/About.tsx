import { create } from "zustand";
import { Drawer } from "vaul";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

const About = () => {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return (
    <div vaul-drawer-wrapper="" className="bg-white  min-h-[100vh]">
      <Drawer.Root shouldScaleBackground>
        About Page==={bears}
        <div>
          <button onClick={() => increasePopulation()}>Add</button>
        </div>
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <Drawer.Trigger>Open</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            aria-describedby={undefined}
            className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0"
          >
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4">
                  Unstyled drawer for React.
                </Drawer.Title>
                <p className="text-zinc-600 mb-2">
                  This component can be used as a replacement for a Dialog on
                  mobile and tablet devices.
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default About;
