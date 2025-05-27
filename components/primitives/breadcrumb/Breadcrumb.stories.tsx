import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View } from 'react-native';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from './Breadcrumb';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Home')}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Components')}>
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Home')}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Text style={{ fontSize: 16, color: '#666' }}>/</Text>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Components')}>
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Text style={{ fontSize: 16, color: '#666' }}>/</Text>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Home')}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis onPress={() => console.log('Show more')} />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Components')}>
            Components
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const InteractiveNavigation: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState(['Home', 'Products', 'Electronics', 'Smartphones', 'iPhone 15']);
    const [navigationHistory, setNavigationHistory] = useState<string[]>([]);
    
    const navigateTo = (index: number) => {
      const newPath = currentPath.slice(0, index + 1);
      setNavigationHistory([...navigationHistory, currentPath.join(' > ')]);
      setCurrentPath(newPath);
    };
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Current Path: {currentPath.join(' > ')}</Text>
        
        <Breadcrumb>
          <BreadcrumbList>
            {currentPath.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BreadcrumbItem>
                  {index === currentPath.length - 1 ? (
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink onPress={() => navigateTo(index)}>
                      {item}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < currentPath.length - 1 && <BreadcrumbSeparator />}
              </View>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        {navigationHistory.length > 0 && (
          <View style={{ gap: 4 }}>
            <Text variant="caption" color="muted">Navigation History:</Text>
            {navigationHistory.slice(-3).map((path, index) => (
              <Text key={index} variant="caption" color="muted">
                {navigationHistory.length - 3 + index + 1}. {path}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  },
};

export const FileSystemNavigation: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState(['Users', 'john', 'Documents', 'Projects', 'my-app', 'src', 'components']);
    
    const navigateToPath = (index: number) => {
      setCurrentPath(currentPath.slice(0, index + 1));
    };
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">File Path: /{currentPath.join('/')}</Text>
        
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onPress={() => setCurrentPath([])}>
                🏠
              </BreadcrumbLink>
            </BreadcrumbItem>
            {currentPath.map((folder, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BreadcrumbSeparator>
                  <Text style={{ fontSize: 16, color: '#666' }}>/</Text>
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {index === currentPath.length - 1 ? (
                    <BreadcrumbPage>{folder}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink onPress={() => navigateToPath(index)}>
                      {folder}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </View>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </View>
    );
  },
};

export const EcommerceNavigation: Story = {
  render: () => {
    const [selectedCategory, setSelectedCategory] = useState(['Electronics', 'Computers', 'Laptops', 'Gaming Laptops']);
    
    const categories = {
      'Electronics': ['Computers', 'Phones', 'Audio', 'Gaming'],
      'Computers': ['Laptops', 'Desktops', 'Tablets', 'Accessories'],
      'Laptops': ['Gaming Laptops', 'Business Laptops', 'Ultrabooks', 'Chromebooks'],
      'Gaming Laptops': ['ASUS ROG', 'MSI Gaming', 'Alienware', 'Razer Blade']
    };
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Category Navigation</Text>
        
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onPress={() => setSelectedCategory([])}>
                🏪 Store
              </BreadcrumbLink>
            </BreadcrumbItem>
            {selectedCategory.map((category, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === selectedCategory.length - 1 ? (
                    <BreadcrumbPage>{category}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink onPress={() => setSelectedCategory(selectedCategory.slice(0, index + 1))}>
                      {category}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </View>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        <View style={{ gap: 8 }}>
          <Text variant="caption" color="muted">
            Available subcategories:
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {(categories[selectedCategory[selectedCategory.length - 1] as keyof typeof categories] || []).map((subcat) => (
              <Pressable
                key={subcat}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: '#f0f0f0',
                  borderRadius: 4
                }}
                onPress={() => setSelectedCategory([...selectedCategory, subcat])}
              >
                <Text style={{ fontSize: 12 }}>{subcat}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    );
  },
};

export const LongPath: Story = {
  render: () => {
    const fullPath = ['Home', 'Dashboard', 'Analytics', 'Reports', 'Sales', 'Q4 2023', 'December', 'Weekly', 'Product Performance'];
    const [showFullPath, setShowFullPath] = useState(false);
    
    const displayPath = showFullPath ? fullPath : [fullPath[0], '...', ...fullPath.slice(-2)];
    
    return (
      <View style={{ gap: 16 }}>
        <Text variant="label">Long Navigation Path</Text>
        
        <Breadcrumb>
          <BreadcrumbList>
            {displayPath.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BreadcrumbItem>
                  {item === '...' ? (
                    <BreadcrumbEllipsis onPress={() => setShowFullPath(!showFullPath)} />
                  ) : index === displayPath.length - 1 ? (
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink onPress={() => console.log(`Navigate to ${item}`)}>
                      {item}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < displayPath.length - 1 && item !== '...' && displayPath[index + 1] !== '...' && (
                  <BreadcrumbSeparator />
                )}
              </View>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        <Text variant="caption" color="muted">
          {showFullPath ? 'Showing full path' : 'Showing condensed path'} • 
          Full path: {fullPath.join(' > ')}
        </Text>
      </View>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Home')}>
            🏠 Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Settings')}>
            ⚙️ Settings
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Account')}>
            👤 Account
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>🔒 Privacy</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const DisabledLinks: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Home')}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink disabled>
            Restricted Area
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Public')}>
            Public Section
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Current Page</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Breadcrumb style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Home')}>
            <Text style={{ color: '#007bff', fontWeight: '600' }}>Home</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Text style={{ fontSize: 18, color: '#007bff' }}>→</Text>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink onPress={() => console.log('Products')}>
            <Text style={{ color: '#007bff', fontWeight: '600' }}>Products</Text>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Text style={{ fontSize: 18, color: '#007bff' }}>→</Text>
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <Text style={{ color: '#28a745', fontWeight: 'bold' }}>Current Item</Text>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}; 