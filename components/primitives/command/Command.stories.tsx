import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { 
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog
} from './Command';
import { Text } from '../../typography/Text';
import { Button } from '../button/Button';

const meta: Meta<typeof Command> = {
  title: 'Primitives/Command',
  component: Command,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="File">
          <CommandItem>
            New File
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Open File
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Save File
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Edit">
          <CommandItem>
            Copy
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Paste
            <CommandShortcut>⌘V</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Undo
            <CommandShortcut>⌘Z</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const SearchExample: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState('');
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Selected: {selectedItem || 'None'}</Text>
        <Command onSelect={setSelectedItem}>
          <CommandInput placeholder="Search for apps..." />
          <CommandList>
            <CommandEmpty>No applications found.</CommandEmpty>
            <CommandGroup heading="Applications">
              <CommandItem value="calendar">📅 Calendar</CommandItem>
              <CommandItem value="calculator">🧮 Calculator</CommandItem>
              <CommandItem value="camera">📷 Camera</CommandItem>
              <CommandItem value="contacts">👥 Contacts</CommandItem>
              <CommandItem value="mail">📧 Mail</CommandItem>
              <CommandItem value="maps">🗺️ Maps</CommandItem>
              <CommandItem value="music">🎵 Music</CommandItem>
              <CommandItem value="notes">📝 Notes</CommandItem>
              <CommandItem value="photos">🖼️ Photos</CommandItem>
              <CommandItem value="safari">🌐 Safari</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </View>
    );
  },
};

export const CommandPalette: Story = {
  render: () => {
    const [selectedAction, setSelectedAction] = useState('');
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Last Action: {selectedAction || 'None'}</Text>
        <Command onSelect={setSelectedAction}>
          <CommandInput placeholder="What do you want to do?" />
          <CommandList>
            <CommandEmpty>No commands found.</CommandEmpty>
            <CommandGroup heading="Quick Actions">
              <CommandItem value="new-document">
                📄 New Document
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem value="open-file">
                📂 Open File
                <CommandShortcut>⌘O</CommandShortcut>
              </CommandItem>
              <CommandItem value="save-all">
                💾 Save All
                <CommandShortcut>⌘⇧S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Navigation">
              <CommandItem value="go-to-line">
                🔢 Go to Line
                <CommandShortcut>⌘G</CommandShortcut>
              </CommandItem>
              <CommandItem value="find-file">
                🔍 Find File
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem value="search-text">
                📝 Search Text
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="View">
              <CommandItem value="toggle-sidebar">
                📋 Toggle Sidebar
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem value="toggle-terminal">
                💻 Toggle Terminal
                <CommandShortcut>⌘`</CommandShortcut>
              </CommandItem>
              <CommandItem value="zen-mode">
                🧘 Zen Mode
                <CommandShortcut>⌘K Z</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </View>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <Command>
      <CommandInput placeholder="Search options..." />
      <CommandList>
        <CommandEmpty>No options found.</CommandEmpty>
        <CommandGroup heading="Account">
          <CommandItem>Profile Settings</CommandItem>
          <CommandItem>Change Password</CommandItem>
          <CommandItem disabled>Delete Account (Disabled)</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Preferences">
          <CommandItem>Theme Settings</CommandItem>
          <CommandItem disabled>Advanced Settings (Pro Only)</CommandItem>
          <CommandItem>Keyboard Shortcuts</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const DialogExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState('');
    
    return (
      <View style={{ gap: 16 }}>
        <Button 
          title="Open Command Palette" 
          onPress={() => setOpen(true)}
        />
        <Text variant="label">Selected: {selectedCommand || 'None'}</Text>
        
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command onSelect={(value) => {
            setSelectedCommand(value);
            setOpen(false);
          }}>
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Recent">
                <CommandItem value="open-project">Open Project</CommandItem>
                <CommandItem value="new-file">New File</CommandItem>
                <CommandItem value="search">Search Files</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem value="git-commit">
                  Git Commit
                  <CommandShortcut>⌘⇧C</CommandShortcut>
                </CommandItem>
                <CommandItem value="git-push">
                  Git Push
                  <CommandShortcut>⌘⇧P</CommandShortcut>
                </CommandItem>
                <CommandItem value="run-task">
                  Run Task
                  <CommandShortcut>⌘⇧T</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </View>
    );
  },
};

export const EmojiSearch: Story = {
  render: () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    
    const emojis = [
      { name: 'smile', emoji: '😊', category: 'Faces' },
      { name: 'heart', emoji: '❤️', category: 'Symbols' },
      { name: 'fire', emoji: '🔥', category: 'Objects' },
      { name: 'rocket', emoji: '🚀', category: 'Travel' },
      { name: 'star', emoji: '⭐', category: 'Symbols' },
      { name: 'thumbs up', emoji: '👍', category: 'People' },
      { name: 'party', emoji: '🎉', category: 'Objects' },
      { name: 'coffee', emoji: '☕', category: 'Food' },
      { name: 'pizza', emoji: '🍕', category: 'Food' },
      { name: 'cat', emoji: '🐱', category: 'Animals' },
      { name: 'dog', emoji: '🐶', category: 'Animals' },
      { name: 'sun', emoji: '☀️', category: 'Nature' },
    ];
    
    const categories = [...new Set(emojis.map(e => e.category))];
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Selected: {selectedEmoji}</Text>
        <Command onSelect={setSelectedEmoji}>
          <CommandInput placeholder="Search emojis..." />
          <CommandList>
            <CommandEmpty>No emojis found.</CommandEmpty>
            {categories.map(category => (
              <View key={category}>
                <CommandGroup heading={category}>
                  {emojis
                    .filter(emoji => emoji.category === category)
                    .map(emoji => (
                      <CommandItem key={emoji.name} value={emoji.emoji}>
                        {emoji.emoji} {emoji.name}
                      </CommandItem>
                    ))}
                </CommandGroup>
                {category !== categories[categories.length - 1] && <CommandSeparator />}
              </View>
            ))}
          </CommandList>
        </Command>
      </View>
    );
  },
};

export const ContactSearch: Story = {
  render: () => {
    const [selectedContact, setSelectedContact] = useState('');
    
    const contacts = [
      { name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer' },
      { name: 'Bob Smith', email: 'bob@example.com', role: 'Developer' },
      { name: 'Carol Davis', email: 'carol@example.com', role: 'Manager' },
      { name: 'David Wilson', email: 'david@example.com', role: 'Developer' },
      { name: 'Emma Brown', email: 'emma@example.com', role: 'Designer' },
      { name: 'Frank Miller', email: 'frank@example.com', role: 'QA' },
    ];
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Selected: {selectedContact || 'None'}</Text>
        <Command onSelect={setSelectedContact}>
          <CommandInput placeholder="Search contacts..." />
          <CommandList>
            <CommandEmpty>No contacts found.</CommandEmpty>
            <CommandGroup heading="Team Members">
              {contacts.map(contact => (
                <CommandItem key={contact.email} value={contact.name}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '600' }}>{contact.name}</Text>
                    <Text style={{ fontSize: 12, opacity: 0.7 }}>
                      {contact.role} • {contact.email}
                    </Text>
                  </View>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </View>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Command style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}>
      <CommandInput 
        placeholder="Dark theme search..." 
        style={{ backgroundColor: '#2a2a2a' }}
        inputStyle={{ color: '#fff' }}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Dark Theme Commands">
          <CommandItem>Toggle Light Mode</CommandItem>
          <CommandItem>Adjust Brightness</CommandItem>
          <CommandItem>High Contrast</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}; 