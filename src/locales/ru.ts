import { Locale } from "./locales";

const ru: Locale = {
    actions: {
        open: 'Открыть',
        save: 'Сохранить',
        remove: 'Удалить',
        clear: 'Очистить',
        nextFrame: 'Следующий фрейм',
        previousFrame: 'Предыдущий фрейм',
        addFrame: 'Добавить фрейм',
        addFrameGroup: 'Добавить группу фреймов',
        removeFrames: 'Удалить фреймы',
        redo: 'Повторить',
        undo: 'Отменить',
        moveFrameForward: 'Сместить фрейм вперёд',
        moveFrameBack: 'Сместить фрейм назад',
        toFirstFrame: 'К первому фрейму',
        toLastFrame: 'К последнему фрейму',
        copyFrame: 'Копировать фрейм',
        add: 'Добавить',
        cancel: 'Отмена',
        close: 'Закрыть',
        colorpick: 'Выбор цвета',
        zoomIn: 'Увеличить',
        zoomOut: 'Уменьшить',
    },
    frame: {
        shape: 'Размеры фрейма',
        cols: 'Количество столбцов',
        rows: 'Количество строк',
        groupName: 'Название группы',
        framesGroupDeletion: 'Удаление группы фреймов',
        framesGroupDeletionMessage: 'Вы уверены, что хотите удалить группу фреймов?',
        frameDeletion: 'Удаление фрейма',
        frameDeletionMessage: 'Вы уверены, что хотите удалить фрейм?',
        frameDeletionMessageExtra: 'Если это последний фрейм группы, то группа также будет удалена.',
    },
    profile: {
        open: 'Открыть профиль',
        untitled: 'Безымянный',
    }
}

export default ru;