import { ReactElement, ReactNode, cloneElement, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from '@hello-pangea/dnd';
import { ReorderData } from '@/domain/types/reorder-data';

type BaseType = { id: string; order: number };

type Props<T extends BaseType> = {
  data: T[];
  droppableId: string;
  onReorder: (data: Pick<ReorderData, 'data'>) => Promise<void>;
  renderComponentItem: (item: T) => ReactNode;
  itemsWrapper?: ReactElement;
  itemWrapper?: ReactElement;
};

export function ReorderList<T extends BaseType>(props: Props<T>) {
  const {
    items,
    droppableId,
    renderComponentItem,
    handleOnDragEnd,
    ItemsWrapper,
    ItemWrapper,
  } = useReorderList(props);

  const renderItem = (item: T, index: number) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {({ innerRef, dragHandleProps, draggableProps }) =>
        cloneElement(
          ItemWrapper,
          { ...dragHandleProps, ...draggableProps, ref: innerRef },
          renderComponentItem(item)
        )
      }
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={droppableId}>
        {({ droppableProps, innerRef, placeholder }) => (
          <div {...droppableProps} ref={innerRef}>
            {cloneElement(ItemsWrapper, undefined, items.map(renderItem))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function useReorderList<T extends BaseType>({
  data,
  droppableId,
  onReorder,
  renderComponentItem,
  itemsWrapper = <></>,
  itemWrapper = <div />,
}: Props<T>) {
  const [items, setItems] = useState<T[]>([]);

  const handleOnDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const orderObject = Object.fromEntries(
      data.map((item, index) => [index, item.order])
    );

    const reorderedItems = [...data];
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = reorderedItems.map((page, index) => ({
      ...page,
      order: orderObject[index],
    }));
    setItems(updatedItems);

    await onReorder({
      data: updatedItems.map(({ id, order }) => ({ id, order })),
    });
    setItems([]);
  };

  return {
    items: items.length ? items : data,
    droppableId,
    renderComponentItem,
    handleOnDragEnd,
    ItemsWrapper: itemsWrapper,
    ItemWrapper: itemWrapper,
  };
}
