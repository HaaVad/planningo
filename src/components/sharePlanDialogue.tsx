"use client"

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SharePlanDialogue() {

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = 'https://www.nrk.no'; // Set your text here
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
      };

      


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Submit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Plan created!</DialogTitle>
          <DialogDescription>
            Anyone with this link can access and vote.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://www.nrk.no"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>

        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
