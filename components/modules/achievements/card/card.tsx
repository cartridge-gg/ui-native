import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import {
  AchievementBit,
  AchievementBits,
  AchievementContent,
  AchievementContentProps,
  AchievementPagination,
  AchievementPin,
  AchievementPinProps,
  AchievementShare,
  AchievementShareProps,
} from '../index';
import { Card, CardHeader, CardTitle } from '../../../primitives/card/Card';

export interface AchievementCardProps {
  name: string;
  achievements: {
    id: string;
    index: number;
    completed: boolean;
    content: AchievementContentProps;
    pin?: AchievementPinProps;
    share?: AchievementShareProps;
  }[];
  style?: ViewStyle;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  name,
  achievements,
  style,
}) => {
  const { colors } = useTheme();
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState<number[]>([]);

  const visibles = useMemo(() => {
    return achievements.filter(
      (a) => a.index === page || (a.content.hidden && !a.completed),
    );
  }, [achievements, page]);

  const handleNext = useCallback(() => {
    const index = pages.indexOf(page);
    const next = pages[index + 1];
    if (!next && next !== 0) return;
    setPage(next);
  }, [page, pages]);

  const handlePrevious = useCallback(() => {
    const index = pages.indexOf(page);
    if (index === 0) return;
    setPage(pages[index - 1]);
  }, [page, pages]);

  useEffect(() => {
    // Set the page to the first uncompleted achievement or 0 if there are none
    const filtereds = achievements.filter(
      (a) => !a.content.hidden || a.completed,
    );
    // Get the unique list of indexes for the achievements in this group
    const pages =
      filtereds.length > 0 ? [...new Set(filtereds.map((a) => a.index))] : [0];
    setPages(pages);
    const page = filtereds.find((a) => !a.completed);
    setPage(page ? page.index : pages[pages.length - 1]);
  }, [achievements]);

  const styles = StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      gap: 1, // gap-x-px
    },
    contentRow: {
      flexDirection: 'row',
      gap: 1, // gap-x-px
    },
    sideActions: {
      flexDirection: 'column',
      gap: 1, // gap-y-px
    },
    headerGrow: {
      flex: 1, // grow
    },
    titleCapitalize: {
      // Remove textTransform since it's not valid for ViewStyle
    },
  });

  if (visibles.length === 0) return null;

  return (
    <Card style={style}>
      <View style={styles.headerRow}>
        <CardHeader style={styles.headerGrow}>
          <CardTitle style={styles.titleCapitalize}>
            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
          </CardTitle>
        </CardHeader>
        {pages.length > 1 && (
          <AchievementPagination
            direction="left"
            onClick={handlePrevious}
            disabled={page === pages[0]}
          />
        )}
        {pages.length > 1 && (
          <AchievementPagination
            direction="right"
            onClick={handleNext}
            disabled={page === pages[pages.length - 1]}
          />
        )}
        {pages.length > 1 && (
          <CardHeader>
            <AchievementBits>
              {pages.map((p) => (
                <AchievementBit
                  key={p}
                  completed={achievements
                    .filter((a) => a.index === p)
                    .every((a) => a.completed)}
                  active={p === page}
                  onClick={() => setPage(p)}
                />
              ))}
            </AchievementBits>
          </CardHeader>
        )}
      </View>
      {visibles.map((achievement) => (
        <View key={achievement.id} style={styles.contentRow}>
          <AchievementContent {...achievement.content} />
          <View
            style={[
              styles.sideActions,
              {
                display: (!achievement.pin && !achievement.share) ? 'none' : 'flex',
              },
            ]}
          >
            {achievement.pin && <AchievementPin {...achievement.pin} />}
            {achievement.share && <AchievementShare {...achievement.share} />}
          </View>
        </View>
      ))}
    </Card>
  );
};

export default AchievementCard;