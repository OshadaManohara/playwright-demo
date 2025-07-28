import {
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
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/typography";

export default function TypographyDemo() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Headings */}
      <H1>The Joke Tax Chronicles</H1>
      <P size="lg">
        Once upon a time, in a far-off land, there was a very lazy king who
        spent all day lounging on his throne. One day, his advisors came to him
        with a problem: the kingdom was running out of money.
      </P>

      <H2>The King&apos;s Plan</H2>
      <P>
        The king thought long and hard, and finally came up with{" "}
        <InlineCode>a brilliant plan</InlineCode> to save the kingdom: he would
        tax the jokes in the land.
      </P>

      <Blockquote>
        &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&rdquo;
      </Blockquote>

      <H3>The Joke Tax</H3>
      <P>
        The new law was simple: anyone caught telling a joke would have to pay a
        fine. The king&apos;s subjects were not amused. They grumbled and
        complained, but the king was firm:
      </P>

      <List type="unordered">
        <ListItem>1st offense: Pay a small fine</ListItem>
        <ListItem>2nd offense: Pay a larger fine</ListItem>
        <ListItem>3rd offense: Give up your funny bone</ListItem>
      </List>

      <P>
        As a result, people stopped telling jokes, and the kingdom became a very
        dull place. But the king was happy, because he was getting rich.
      </P>

      <H4>The Consequences</H4>
      <P>
        The people were not happy with the new law, and they decided to do
        something about it. They organized a rebellion, and the king was
        overthrown. The end.
      </P>

      {/* Table Example */}
      <H2>Payment Schedule</H2>
      <Table>
        <TableCaption>A list of joke tax rates by offense level.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Offense</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fine Amount</TableHead>
            <TableHead className="text-right">Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1st</TableCell>
            <TableCell>Warning</TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell className="text-right">Credit Card</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">2nd</TableCell>
            <TableCell>Minor</TableCell>
            <TableCell>$50.00</TableCell>
            <TableCell className="text-right">Cash</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">3rd</TableCell>
            <TableCell>Major</TableCell>
            <TableCell>Funny bone</TableCell>
            <TableCell className="text-right">Surgical removal</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Ordered List Example */}
      <H3>Steps to Appeal</H3>
      <List type="ordered">
        <ListItem>
          Submit a formal complaint to the Department of Humor
        </ListItem>
        <ListItem>Wait for a response (may take 3-5 business days)</ListItem>
        <ListItem>
          If approved, your <InlineCode>funny bone</InlineCode> will be returned
        </ListItem>
        <ListItem>Continue making jokes at your own risk</ListItem>
      </List>

      <P size="sm">
        This story is completely fictional and any resemblance to real events is
        purely coincidental.
      </P>
    </div>
  );
}
