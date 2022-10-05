import React, {useState, useEffect} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

import styles from "styles/components/admin/public/sortableComponents.module.css"

const SortableItem = SortableElement(({value}) => <li>{value}</li>);

const SortableList = SortableContainer(({items, ulStyle}) => {
  return (
    <ul style={ulStyle}>
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value}/>
      ))}
    </ul>
  );
});


/*
items : ["value1","value2","value3"]
setItems : items의 값을 설정할 수 있는 함수 (useState)
components: [<YourComponent/>,<YourComponent/>,<YourComponent/>]
setComponents: 위와같음
mode : x->가로형, y->세로형, xy->그리드형(가로 & 세로)
ulStyle : item 컴포넌트들을 감싸는 ul의 style 객체. 예) {display: "flex"}
*/
const SortableComponent = ({items, setItems, components, setComponents, mode, ulStyle, pressDelay}) => {
  // const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'])


  const onSortEnd = ({ oldIndex, newIndex }) => {
    setComponents(arrayMoveImmutable(components, oldIndex, newIndex))
    setItems(arrayMoveImmutable(items, oldIndex, newIndex))
  };

  return <SortableList items={components} onSortEnd={onSortEnd} axis={mode} ulStyle={ulStyle} pressDelay={pressDelay} />;
}

export default SortableComponent