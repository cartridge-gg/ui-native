import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { 
  Alert, 
  AlertTitle, 
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from './';
import { Text } from '../../typography/Text';
import { Button } from '../button/Button';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Alert variant="default">
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with normal styling.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
      
      <Alert variant="constructive">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          Your action was completed successfully!
        </AlertDescription>
      </Alert>
    </View>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert>
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert variant="default">
      <AlertTitle>Important Information</AlertTitle>
      <AlertDescription>
        This is a longer alert message that demonstrates how the component handles 
        multiple lines of text. The content should wrap properly and maintain 
        good readability across different screen sizes. You can include important 
        information, warnings, or instructions that users need to be aware of.
      </AlertDescription>
    </Alert>
  ),
};

// AlertDialog Stories
export const SimpleDialog: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button title="Show Alert" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const ControlledDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Dialog is {open ? 'open' : 'closed'}</Text>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger>
            <Button title="Open Controlled Dialog" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This dialog's open state is controlled by external state.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </View>
    );
  },
};

export const DeleteConfirmation: Story = {
  render: () => {
    const [deleted, setDeleted] = useState(false);
    
    return (
      <View style={{ gap: 16 }}>
        {deleted && (
          <Alert variant="destructive">
            <AlertTitle>Item Deleted</AlertTitle>
            <AlertDescription>The item has been permanently deleted.</AlertDescription>
          </Alert>
        )}
        
        <AlertDialog>
          <AlertDialogTrigger>
            <Button title="Delete Item" variant="secondary" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this item? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                variant="destructive"
                onPress={() => setDeleted(true)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </View>
    );
  },
};

export const SaveChanges: Story = {
  render: () => {
    const [saved, setSaved] = useState(false);
    
    return (
      <View style={{ gap: 16 }}>
        {saved && (
          <Alert variant="constructive">
            <AlertTitle>Changes Saved</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>
        )}
        
        <AlertDialog>
          <AlertDialogTrigger>
            <Button title="Save Changes" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Save Changes</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to save your changes before leaving this page?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Don't Save</AlertDialogCancel>
              <AlertDialogAction onPress={() => setSaved(true)}>
                Save Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </View>
    );
  },
};

export const LogoutConfirmation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button title="Logout" variant="secondary" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout? You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay Logged In</AlertDialogCancel>
          <AlertDialogAction>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const CustomActions: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button title="Custom Actions" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Choose Action</AlertDialogTitle>
          <AlertDialogDescription>
            Select one of the following actions to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const NotificationExamples: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Alert>
        <AlertTitle>📢 New Feature Available</AlertTitle>
        <AlertDescription>
          Check out our new dashboard feature that helps you track your progress.
        </AlertDescription>
      </Alert>
      
      <Alert variant="destructive">
        <AlertTitle>⚠️ Connection Error</AlertTitle>
        <AlertDescription>
          Unable to connect to the server. Please check your internet connection.
        </AlertDescription>
      </Alert>
      
      <Alert variant="constructive">
        <AlertTitle>✅ Backup Complete</AlertTitle>
        <AlertDescription>
          Your data has been successfully backed up to the cloud.
        </AlertDescription>
      </Alert>
    </View>
  ),
}; 