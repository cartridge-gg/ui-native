import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose,
} from './dialog';
import { Button } from '../button/Button';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        Open
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary">Open Dialog with Footer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed with this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SimpleDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary">Simple Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Simple Dialog</DialogTitle>
        </DialogHeader>
        <Text variant="body" style={{ textAlign: 'center', marginVertical: 16 }}>
          This is a simple dialog with just a title and some content.
        </Text>
      </DialogContent>
    </Dialog>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="tertiary">Long Content Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read the following terms and conditions carefully.
          </DialogDescription>
        </DialogHeader>
        <View style={{ marginVertical: 16 }}>
          <Text variant="body" style={{ marginBottom: 12 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text variant="body" style={{ marginBottom: 12 }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text variant="body">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Text>
        </View>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Decline</Button>
          </DialogClose>
          <Button variant="primary">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ControlledDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <View style={{ gap: 12 }}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button variant="primary">Open Controlled Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's open state is controlled by the parent component.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onPress={() => setOpen(false)}>
                Close Programmatically
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="outline" 
          onPress={() => setOpen(true)}
        >
          Open from External Button
        </Button>
      </View>
    );
  },
};

export const AlertDialog: Story = {
  render: () => {
    const AlertDialog = require('../alert/AlertDialog').AlertDialog;
    const AlertDialogTrigger = require('../alert/AlertDialog').AlertDialogTrigger;
    const AlertDialogContent = require('../alert/AlertDialog').AlertDialogContent;
    const AlertDialogHeader = require('../alert/AlertDialog').AlertDialogHeader;
    const AlertDialogTitle = require('../alert/AlertDialog').AlertDialogTitle;
    const AlertDialogDescription = require('../alert/AlertDialog').AlertDialogDescription;
    const AlertDialogFooter = require('../alert/AlertDialog').AlertDialogFooter;
    const AlertDialogCancel = require('../alert/AlertDialog').AlertDialogCancel;
    const AlertDialogAction = require('../alert/AlertDialog').AlertDialogAction;
    
    return (
      <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
}; 