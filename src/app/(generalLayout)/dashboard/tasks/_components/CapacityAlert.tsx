import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAutoAssign: () => void;
};

export function CapacityAlert({ open, setOpen, handleAutoAssign }: TProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* <AlertDialogTrigger asChild>{children}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Insufficient capacity!</AlertDialogTitle>
          <AlertDialogDescription>
            This member does not have enough capacity to take on new tasks.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-start! flex">
          <AlertDialogCancel>Choose Another</AlertDialogCancel>
          <AlertDialogAction onClick={handleAutoAssign}>
            Auto Assign
          </AlertDialogAction>
          <AlertDialogAction className="bg-destructive hover:bg-destructive">
            Assign Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
