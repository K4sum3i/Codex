import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  children: React.ReactNode;
  variant: string;
  description: string;
  loading?: boolean;
  onClick?: () => void;
  open: boolean;
  handleOpen: () => void;
};

export default function AlertDialogBox({
  children,
  variant,
  description,
  loading = false,
  onClick,
  handleOpen,
  open,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size={"lg"}>Cancel</AlertDialogCancel>
          <Button variant={variant} onClick={onClick} size={"lg"}>
            {loading ? (
              <>
                <Spinner />
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
