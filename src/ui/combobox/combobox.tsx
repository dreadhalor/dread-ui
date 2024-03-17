import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { cn, generateUntypeableId } from '@repo/utils';
import {
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  selectVariants,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TruncatedText,
} from '@dread-ui/index';

type Props = {
  /** Array of objects representing the options for the combobox. Each object should have a `value` (unique identifier) and a `label` (display text). */
  values?: { value: string; label: string }[];
  /** Additional CSS class names to apply to the combobox for custom styling. */
  className?: string;
  /** Children elements to be rendered at the bottom of the combobox, typically used for custom elements or additional functionality. */
  children?: React.ReactNode;
  /** Array of selected option values. This prop is used to control the component (controlled mode). When not provided, the component works in uncontrolled mode. */
  value?: string[];
  /** Callback function that is called when the selection changes. It receives the new array of selected option values. */
  onChange?: (selectedValues: string[]) => void;
  /** Optional filter function to use when searching. */
  filter?: ((value: string, search: string) => number) | undefined;
};

interface ComboboxContextValue {
  /** Placeholder text to display when no option is selected. */
  placeholder?: string;
  /** Children elements to be rendered at the bottom of the combobox, typically used for custom elements or additional functionality. */
  children?: React.ReactNode;
  /** Array of selected option values. This prop is used to control the component (controlled mode). When not provided, the component works in uncontrolled mode. */
  value: string[];
  /** Callback function that is called when the selection changes. It receives the new array of selected option values. */
  onChange?: (selectedValues: string[]) => void;
  /** Optional filter function to use when searching. */
  filter?: ((value: string, search: string) => number) | undefined;
  /** Function to determine if the combobox is truncated. */
  truncated?: boolean;
  /** Function to set the truncated state. */
  setTruncated?: React.Dispatch<React.SetStateAction<boolean>>;
  /** Function to handle selection of an option. */
  handleSelect: (value: string) => void;
  /** Map of values to labels. */
  itemsMap: Map<string, string>;
  addItem: (item: ComboboxItemValue) => void;
  removeItem: (itemValue: string) => void;
}
const ComboboxContext = React.createContext<ComboboxContextValue>(
  {} as ComboboxContextValue,
);

function useComboboxContext() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error(
      'useComboboxContext must be used within a ComboboxProvider',
    );
  }
  return context;
}

// Helper function to extract items from children
function extractItems(children: React.ReactNode): ComboboxItemValue[] {
  return React.Children.toArray(children).flatMap((child) => {
    // Type guard to check if the element is a valid React element
    if (React.isValidElement(child)) {
      // Further check if it's a ComboboxItem or has children
      if (child.type === ComboboxItem) {
        // Cast the child to have ComboboxItemProps
        const comboboxItem = child as React.ReactElement<ComboboxItemProps>;
        return [
          {
            value: comboboxItem.props.value,
            label: React.Children.toArray(comboboxItem.props.children).join(''),
          },
        ];
      } else if (child.props && child.props.children) {
        // Recursively extract items from children
        return extractItems(child.props.children);
      }
    }
    return [];
  });
}

type ComboboxValueProps = {
  /** Additional CSS class names to apply to the combobox for custom styling. */
  className?: string;
  /** Placeholder string to show when no element is selected. */
  placeholder?: string;
} & React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
// TODO: When the combobox is squished horizontally, the invisible reference element is not squished with it.
const ComboboxValue = ({
  className,
  placeholder,
  ...props
}: ComboboxValueProps) => {
  const { value, itemsMap, truncated, setTruncated } = useComboboxContext();

  const hasSelectedValues = value.length > 0;
  const getDisplayText = () => {
    if (!value.length) return placeholder;
    const count = truncated ? `(${value.length}) ` : '';
    const labels = value.map((v) => itemsMap.get(v) || v).join(', ');
    return `${count}${labels}`;
  };
  const getRawSelectedText = () => {
    const labels = value.map((v) => itemsMap.get(v) || v);
    const result = labels.join(', ');
    return `${result}`;
  };

  const popoverClassNames = cn(
    selectVariants(),
    'relative justify-start gap-1',
    !hasSelectedValues && 'text-input',
  );
  const referenceClassNames = cn(
    popoverClassNames,
    'invisible absolute inset-0',
  );

  return (
    <Tooltip>
      <TooltipContent
        className={cn('tooltip-content-max', !truncated && 'hidden')}
      >
        {getRawSelectedText()}
      </TooltipContent>
      <TooltipTrigger asChild>
        <PopoverTrigger className={cn(popoverClassNames, className)} {...props}>
          <div className={cn(referenceClassNames, className)}>
            <TruncatedText onTruncation={setTruncated}>
              {getRawSelectedText()}
            </TruncatedText>
            <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          </div>
          <TruncatedText>{getDisplayText()}</TruncatedText>
          <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </PopoverTrigger>
      </TooltipTrigger>
    </Tooltip>
  );
};

const ComboboxContent = ({ children }: { children: React.ReactNode }) => {
  const { filter, addItem, removeItem } = useComboboxContext();

  React.useEffect(() => {
    const items = extractItems(children);

    if (items) {
      items.forEach((item) => {
        if (item) {
          addItem(item);
        }
      });
    }

    return () => {
      if (items) {
        items.forEach((item) => {
          if (item) {
            removeItem(item.value);
          }
        });
      }
    };
  }, [children, addItem, removeItem]);

  return (
    <PopoverContent className='popover-content p-0'>
      <Command className='rounded-none' filter={filter}>
        {children}
      </Command>
    </PopoverContent>
  );
};

const ComboboxInput = React.forwardRef<
  React.ElementRef<typeof CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandInput>
>(({ className, wrapperClassName, ...props }, ref) => (
  <CommandInput
    ref={ref}
    className={cn('h-9', className)}
    wrapperClassName={cn(
      'rounded-none border-4 border-b-[5px]',
      wrapperClassName,
    )}
    {...props}
  />
));
ComboboxInput.displayName = 'ComboboxInput';

const ComboboxEmpty = React.forwardRef<
  React.ElementRef<typeof CommandEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandEmpty>
>((props, ref) => <CommandEmpty ref={ref} {...props} />);
ComboboxEmpty.displayName = 'ComboboxEmpty';

const ComboboxList = React.forwardRef<
  React.ElementRef<typeof CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandList>
>((props, ref) => <CommandList ref={ref} {...props} />);
ComboboxList.displayName = 'ComboboxList';

const ComboboxGroup = React.forwardRef<
  React.ElementRef<typeof CommandGroup>,
  React.ComponentPropsWithoutRef<typeof CommandGroup>
>((props, ref) => <CommandGroup ref={ref} {...props} />);
ComboboxGroup.displayName = 'ComboboxGroup';

interface ComboboxItemValue {
  value: string;
  label: string;
}
type ComboboxItemProps = {
  value: string;
  children: string;
};
const ComboboxItem = ({ value, children }: ComboboxItemProps) => {
  const { value: comboboxValue, itemsMap, handleSelect } = useComboboxContext();
  const label = itemsMap.get(value) || value;
  const isSelected = comboboxValue.includes(value);

  return (
    <CommandItem
      onSelect={() => handleSelect(value)}
      className={cn(!isSelected && 'text-muted-foreground')}
      value={label}
    >
      <Checkbox checked={isSelected} className='mr-3' />
      {children}
    </CommandItem>
  );
};

type ComboboxAddItemProps = {
  onSelect?: () => void;
  children: React.ReactNode;
};
const ComboboxFooter = ({ children, onSelect }: ComboboxAddItemProps) => {
  const [id] = React.useState(generateUntypeableId(32));
  return (
    <CommandGroup forceMount>
      <CommandItem
        className='caption-1 text-mosaic aria-selected:text-mosaic cursor-pointer gap-2'
        onSelect={onSelect}
        value={id}
        forceMount
      >
        {children}
      </CommandItem>
    </CommandGroup>
  );
};

/** A multi-select combobox. */
const Combobox = ({ children, value, onChange, filter }: Props) => {
  const [truncated, setTruncated] = React.useState(false);
  const [itemsMap, setItemsMap] = React.useState(new Map<string, string>());
  const [internalValue, setInternalValue] = React.useState<string[]>([]);

  const isControlled = value != null;

  const handleSelect = (selectedValue: string) => {
    let updatedValues: string[];
    if (internalValue.includes(selectedValue)) {
      updatedValues = internalValue.filter((v) => v !== selectedValue);
    } else {
      // Add new item and order by itemsMap
      updatedValues = [...internalValue, selectedValue].sort(
        (a, b) =>
          Array.from(itemsMap.keys()).indexOf(a) -
          Array.from(itemsMap.keys()).indexOf(b),
      );
    }

    setInternalValue(updatedValues);
    // if (isControlled && onChange) onChange(updatedValues);
    if (onChange) onChange(updatedValues);
  };

  React.useEffect(() => {
    if (isControlled) {
      const orderedValues = value
        .filter((v) => itemsMap.has(v))
        .sort(
          (a, b) =>
            Array.from(itemsMap.keys()).indexOf(a) -
            Array.from(itemsMap.keys()).indexOf(b),
        );
      setInternalValue(orderedValues);
      if (onChange && JSON.stringify(orderedValues) !== JSON.stringify(value))
        onChange(orderedValues);
    }
  }, [value, itemsMap, isControlled, onChange]);

  const addItem = React.useCallback((item: ComboboxItemValue) => {
    setItemsMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(item.value, item.label);
      return newMap;
    });
  }, []);
  const removeItem = React.useCallback((itemValue: string) => {
    setItemsMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(itemValue);
      return newMap;
    });
  }, []);

  return (
    <ComboboxContext.Provider
      value={{
        children,
        value: isControlled ? value : internalValue,
        onChange: isControlled ? onChange : undefined,
        filter,
        truncated,
        setTruncated,
        handleSelect,
        itemsMap,
        addItem,
        removeItem,
      }}
    >
      <Popover>{children}</Popover>
    </ComboboxContext.Provider>
  );
};

export {
  ComboboxValue,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxList,
  ComboboxGroup,
  ComboboxItem,
  ComboboxFooter,
  Combobox,
};
