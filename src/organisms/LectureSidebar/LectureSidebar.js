import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import SidebarItem from '../../atoms/SidebarItem/SidebarItem';

import { ReactComponent as ChevronsLeft } from '../../assets/icons/chevrons-left.svg';
import { ReactComponent as ChevronsRight } from '../../assets/icons/chevrons-right.svg';
import IconButton from '../../atoms/IconButton/IconButton';

const LectureSidebar = ({
  items,
  handleItemClick,
  handleDeleteItem,
  dark,
  children,
  currentActiveItem,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    setActiveItem(currentActiveItem);
  }, [currentActiveItem]);

  const handleClick = (item) => {
    handleItemClick(item);
    setActiveItem(item);
  };

  const handleDeleteButtonClick = (itemId) => {
    handleDeleteItem(itemId);
    setActiveItem(null);
  };

  return (
    <StyledLectureSidebar dark={dark} isSidebarOpen={isSidebarOpen}>
      <SidebarHeader>
        <CollapseButton>
          <IconButton
            onClick={() => setIsSidebarOpen((prevOpen) => !prevOpen)}
            color={dark ? 'onSurfacePrimary' : 'onSurfacePrimary'}
            hoverColor="primaryDark"
            background={dark ? 'onSurfaceTwoPrimary' : 'primary'}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </IconButton>
        </CollapseButton>
        <TitleArea>{children.length ? children[0] : children}</TitleArea>
        {children.length && <SearchArea>{children[1]}</SearchArea>}
      </SidebarHeader>

      <ScrollArea>
        {items &&
          items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              handleItemClick={handleClick}
              handleDeleteItem={handleDeleteButtonClick}
              isActive={activeItem && activeItem.id === item.id}
              dark={dark}
            />
          ))}
      </ScrollArea>
    </StyledLectureSidebar>
  );
};

const StyledLectureSidebar = styled.div`
  width: ${({ isSidebarOpen }) => (isSidebarOpen ? '255px' : '55px')};
  transition: 1s ease;
  background: ${({ theme, dark }) => (dark ? theme.surface : theme.surfaceTwo)};
  color: ${({ theme, dark }) => (dark ? theme.onSurface : theme.onSurfaceTwo)};
  height: 100%;
  padding: ${({ theme }) => theme.spacingLarge} 0;
`;

const SidebarHeader = styled.div``;

const ScrollArea = styled.div``;

const TitleArea = styled.h4`
  font-size: 19px;
  font-weight: bold;
  margin: 0 ${({ theme }) => theme.spacingLarge};
  margin-bottom: ${({ theme }) => theme.spacingLarge};
  display: grid;
  grid-template-columns: 27px auto 30px;
  align-items: center;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > *:first-child svg {
    margin-right: 15px;
  }

  svg {
    height: 15px;
    width: 15px;
  }
`;

const SearchArea = styled.div``;

const CollapseButton = styled.span`
  position: absolute;
  left: 12.5px;
  bottom: 12.5px;
`;

LectureSidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  handleItemClick: PropTypes.func,
};

LectureSidebar.defaultProps = {
  showButton: true,
};

export default LectureSidebar;
