import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("scroll-m-20 tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

const paragraphVariants = cva("leading-7", {
  variants: {
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg text-muted-foreground",
      xl: "text-xl text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const listVariants = cva("my-6 ml-6", {
  variants: {
    type: {
      unordered: "list-disc",
      ordered: "list-decimal",
    },
  },
  defaultVariants: {
    type: "unordered",
  },
});

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: "h1" | "h2" | "h3" | "h4";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, ...props }, ref) => {
    const Comp = level;
    return (
      <Comp
        className={cn(headingVariants({ level }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(headingVariants({ level: "h1" }), className)}
    {...props}
  />
));
H1.displayName = "H1";

const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(headingVariants({ level: "h2" }), className)}
    {...props}
  />
));
H2.displayName = "H2";

const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(headingVariants({ level: "h3" }), className)}
    {...props}
  />
));
H3.displayName = "H3";

const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(headingVariants({ level: "h4" }), className)}
    {...props}
  />
));
H4.displayName = "H4";

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const P = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        paragraphVariants({ size }),
        "[&:not(:first-child)]:mt-1",
        className
      )}
      {...props}
    />
  )
);
P.displayName = "P";

const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn("mt-6 border-l-2 pl-6 italic", className)}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";

interface UnorderedListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {
  type?: "unordered";
}

interface OrderedListProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof listVariants> {
  type: "ordered";
}

type ListProps = UnorderedListProps | OrderedListProps;

const List = React.forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  ({ className, type = "unordered", ...props }, ref) => {
    if (type === "ordered") {
      return (
        <ol
          ref={ref as React.ForwardedRef<HTMLOListElement>}
          className={cn(listVariants({ type }), className)}
          {...(props as React.HTMLAttributes<HTMLOListElement>)}
        />
      );
    }

    return (
      <ul
        ref={ref as React.ForwardedRef<HTMLUListElement>}
        className={cn(listVariants({ type }), className)}
        {...(props as React.HTMLAttributes<HTMLUListElement>)}
      />
    );
  }
);
List.displayName = "List";

const ListItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("mt-2", className)} {...props} />
));
ListItem.displayName = "ListItem";

const InlineCode = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <code
    ref={ref}
    className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className
    )}
    {...props}
  />
));
InlineCode.displayName = "InlineCode";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="my-6 w-full overflow-y-auto">
    <table ref={ref} className={cn("w-full", className)} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Heading,
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  List,
  ListItem,
  InlineCode,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  headingVariants,
  paragraphVariants,
  listVariants,
};
